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

class CreateProposalAccessStats < ActiveRecord::Migration
	def change
		create_table :proposal_access_stats do |t|
			t.belongs_to :proposal, null: false
			t.belongs_to :access_url, null: false

			t.string :remote_ip, null: false
			t.string :referer
			t.datetime :session_end, null: false

			t.timestamps
		end
		add_index :proposal_access_stats, :proposal_id
		add_index :proposal_access_stats, :access_url_id
	end
end
