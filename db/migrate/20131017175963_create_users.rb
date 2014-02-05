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

class CreateUsers < ActiveRecord::Migration
	def change
		create_table :users do |t|
			t.string :email, null: false

			t.string :password_digest

			t.string :name
			t.string :job
			t.string :twitter
			t.string :linkedin
			t.string :phone

			t.has_attached_file :avatar

			t.datetime :last_login_at

			t.timestamps
		end
	end
end
