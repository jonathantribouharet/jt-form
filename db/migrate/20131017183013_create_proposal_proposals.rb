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

class CreateProposalProposals < ActiveRecord::Migration
	def change
		create_table :proposal_proposals do |t|
			t.belongs_to :form, null: false
			t.belongs_to :user, null: false
			t.belongs_to :template, null: false

			t.string :name, null: false
			t.integer :percent, null: false, default: 0

			t.text :data, null: false, default: {}

			t.timestamps
		end
		add_index :proposal_proposals, :user_id
	end
end
