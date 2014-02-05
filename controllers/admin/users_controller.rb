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

class Admin::UsersController < Admin::AdminController

	def index
		@users = User.all
	end

	def create
		user = User.new(params[:user].permit!)
		user.password = user.password_confirmation = '94f5um8ix2'

		user.email = user.email.to_s.strip
		
		if user.save
			flash[:success] = 'Created'
		else
			flash[:alert] = user.errors.map { |key, message| key.to_s + ': ' + message.to_s }.join("\n")
		end

		redirect_to admin_users_url
	end

end
