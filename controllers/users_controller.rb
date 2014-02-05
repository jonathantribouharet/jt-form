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

class UsersController < ApplicationController

	before_filter :require_no_user

	# def new
	# 	@user = User.new
	# end

	def create
		@user = User.new(params[:user].permit!)
		
		if @user.save
			session[:user_id] = @user.id
			@user.update_attribute(:last_login_at, Time.now)
			redirect_to member_root_url
		else
			redirect_to root_url
		end
	end

	def password
		if request.post?
			user = User.where(email: params[:email]).first
			
			user.send_new_password! if user
		end

		redirect_to root_url
	end

end
