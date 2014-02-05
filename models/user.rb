# 
# COPYRIGHT Jonathan Tribouharet
# __________________
# 
#  [2013] - [2014] Jonathan Tribouharet
#  All Rights Reserved.
# 
# NOTICE:  All information contained herein is, and remains
# the property of Jonathan Tribouharet.
# The intellectual and technical concepts contained
# herein are proprietary to Jonathan Tribouharet
# and may be covered by U.S. and Foreign Patents,
# patents in process, and are protected by trade secret or copyright law.
# Dissemination of this information or reproduction of this material
# is strictly forbidden unless prior written permission is obtained
# from Jonathan Tribouharet.

class User < ActiveRecord::Base

	has_many :proposals, dependent: :destroy, class_name: 'Proposal::Proposal'
	has_many :social_accounts, dependent: :destroy

	has_secure_password(validations: false)

	has_attached_file :avatar, styles: { thumb: '300x300' }, default_url: '/images/picture-member.jpg'

	validates :email, presence: true, uniqueness: { case_sensitive: false }, email_format: true, if: Proc.new { |u| !u.have_social? }
	validates :password_digest, presence: true, if: Proc.new { |u| !u.have_social? }

	def generate_new_password
		token_size = 10
		charset = %w{ 0 1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z }

		self.password = self.password_confirmation = (0...token_size).map{ charset.to_a[rand(charset.size)] }.join
	end

    def send_new_password!
    	self.generate_new_password
    	self.save!

    	UserMailer.password_forgot(self, self.password).deliver
    end
	
	def self.create_or_update_from_auth_hash(auth_hash)
		expires_at = nil
		expires_at = Time.at(auth_hash['credentials']['expires_at']) if !auth_hash['credentials']['expires_at'].blank?

		# Search existing account
		account = SocialAccount.where(provider_name: auth_hash['provider']).where(provider_uid: auth_hash['uid'].to_s).first
		if account
			account.token = auth_hash['credentials']['token']
			account.refresh_token = auth_hash['credentials']['refresh_token']
			account.expires_at = expires_at
			account.save
			return account.user
		end
		
		# Search user with the same email
		user = User.where(email: auth_hash['info']['email']).first
		if user
			user.social_accounts.create!(
				provider_name: auth_hash['provider'],
				provider_uid: auth_hash['uid'].to_s,
				token: auth_hash['credentials']['token'],
				refresh_token: auth_hash['credentials']['refresh_token'],
				expires_at: expires_at
			)
			user.update_column(:have_social, true)
			return user
		end

		# Create user
		user = User.create!(
			name: auth_hash['info']['name'],
			email: auth_hash['info']['email'],
			have_social: true
		)

		account = user.social_accounts.create!(
			provider_name: auth_hash['provider'],
			provider_uid: auth_hash['uid'].to_s,
			token: auth_hash['credentials']['token'],
			refresh_token: auth_hash['credentials']['refresh_token'],
			expires_at: expires_at
		)
		user
	end

	def update_from_auth_hash(auth_hash)
		expires_at = nil
		expires_at = Time.at(auth_hash['credentials']['expires_at']) if !auth_hash['credentials']['expires_at'].blank?

		# Search existing account
		account = self.social_accounts.where(provider_name: auth_hash['provider']).where(provider_uid: auth_hash['uid'].to_s).first
		if account
			account.token = auth_hash['credentials']['token']
			account.refresh_token = auth_hash['credentials']['refresh_token']
			account.expires_at = expires_at
			account.save
			return account
		end
		
		acount = self.social_accounts.create!(
			provider_name: auth_hash['provider'],
			provider_uid: auth_hash['uid'].to_s,
			token: auth_hash['credentials']['token'],
			refresh_token: auth_hash['credentials']['refresh_token'],
			expires_at: expires_at
		)
		self.update_column(:have_social, true)
		return acount
	end

end
