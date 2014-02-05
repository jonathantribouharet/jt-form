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

class SessionsController < ApplicationController

	# before_filter :require_no_user, :except => :destroy

	# def new
	# end
	
	def create
		if auth_hash
			if current_user
				current_user.update_from_auth_hash(auth_hash)
				redirect_to member_root_url(eventbrite: true)
				return
			else
				user = User.create_or_update_from_auth_hash(auth_hash)
			end
		else
			user = User.where(email: params[:email]).first.try(:authenticate, params[:password])
		end

		if user
			session[:user_id] = user.id
			user.update_attribute(:last_login_at, Time.now)
			redirect_to member_root_url
		else
			redirect_to root_url
		end
	end

	def destroy
		session.destroy
		redirect_to root_url
	end

	def failure
		redirect_to root_url
	end

private

	def auth_hash
		request.env['omniauth.auth']
	end

end
