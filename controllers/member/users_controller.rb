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

class Member::UsersController < Member::MemberController

	def update
		current_user.update_attributes(user_params)

		redirect_to member_root_url if !request.xhr?
	end

private

	def user_params
		params.require(:user).permit(:name, :job, :email, :phone, :twitter, :linkedin, :avatar, :password, :password_confirmation)
	end

end
