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

class CreateFormQuestions < ActiveRecord::Migration
	def change
		create_table :form_questions do |t|
			t.belongs_to :subsection, null: false
			t.integer :position, null: false

			t.text :content
			t.text :hint

			t.string :key, null: false
			
			t.string :input, null: false
			t.text :options, null: false, default: {}

			t.timestamps
		end
		add_index :form_questions, :subsection_id
	end
end
