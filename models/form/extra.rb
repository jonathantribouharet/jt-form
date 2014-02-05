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

class Form::Extra < ActiveRecord::Base

	include Serialize

	belongs_to :section, class_name: 'Form::Section'

	validates :section_id, presence: true

	validates :input, presence: true

	serialize :options

	TYPES = [
		'image_field',
		'text_area'
	]

end
