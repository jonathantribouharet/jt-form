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

class Template::Section < ActiveRecord::Base
	include Sortable

	belongs_to :template, class_name: 'Template::Template'

	has_many :questions, dependent: :destroy, class_name: 'Template::Question'

	validates :template_id, presence: true

	validates :name, presence: true


	TYPES = [
		'content'
	]

	def where_for_position
		self.template.sections
	end

end
