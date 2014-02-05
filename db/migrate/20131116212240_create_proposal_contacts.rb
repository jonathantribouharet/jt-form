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

class CreateProposalContacts < ActiveRecord::Migration
	def change
		create_table :proposal_contacts do |t|
			t.belongs_to :proposal, null: false
			t.belongs_to :access_url
			t.belongs_to :access_stat

			t.string :name
			t.string :email
			t.string :phone

			t.string :company
			t.string :job

			t.string :website
			t.text :content

			t.text :packages, null: false, default: {}
			t.text :non_packages, null: false, default: {}

			t.timestamps
		end
	end
end
