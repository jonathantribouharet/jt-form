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

class Template::Question < ActiveRecord::Base

	include Sortable
	include Serialize

	belongs_to :section, class_name: 'Template::Section'

	has_many :answers, dependent: :destroy, class_name: 'Template::Answer'

	validates :section_id, presence: true

	validates :key, :input, :content, presence: true

	serialize :options

	TYPES = [
		# 'text_field'
	]

	def where_for_position
		self.section.questions
	end

end
