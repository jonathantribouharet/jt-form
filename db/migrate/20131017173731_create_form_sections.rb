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

class CreateFormSections < ActiveRecord::Migration
	def change
		create_table :form_sections do |t|
			t.belongs_to :form, null: false
			t.integer :position, null: false
			
			t.string :name, null: false
			t.text :icon
			t.boolean :is_removable, null: false, default: false

			t.timestamps
		end
		add_index :form_sections, :form_id
	end
end
