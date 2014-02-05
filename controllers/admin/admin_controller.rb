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

class Admin::AdminController < ApplicationController

	layout 'admin'

	before_action :set_http_authentication

	def set_http_authentication
		return if !Rails.env.production?
		authenticate_or_request_with_http_basic do |username, password|
			username == 'admin' && password == 'n28cgfdjxz2m38'
		end
	end

end
