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

class CreateProposalAccessUrls < ActiveRecord::Migration
	def change
		create_table :proposal_access_urls do |t|
			t.belongs_to :proposal, null: false

			t.string :name, null: false
			t.string :token, null: false

			t.timestamps
		end
		add_index :proposal_access_urls, :proposal_id
		add_index :proposal_access_urls, :token
	end
end
