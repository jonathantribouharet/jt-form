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

class Form::Question < ActiveRecord::Base
	include Sortable
	include Serialize
	
	belongs_to :subsection, class_name: 'Form::Subsection'

	has_many :answers, dependent: :destroy, class_name: 'Proposal::Answer'

	validates :subsection_id, presence: true

	# validates :key, uniqueness: true, par form
	validates :key, :input, :content, presence: true

	serialize :options

	TYPES = [
		'date_place',
		'file_field',
		'finance',
		'input_tag',
		'input_tag_text',
		'key_number',
		'media_social',
		'media_website',
		'number_field',
		'number_range',
		'non_media',
		'non_packages',
		'packages',
		'select_range',
		'slider_gender',
		'slider_range_percent',
		'sponsorship_scope',
		'sponsorship_needed',
		'target_audience',
		'team',
		'text_area',
		'text_area_file',
		'text_area_title',
		'text_field'
	]

	def where_for_position
		self.subsection.questions
	end

end
