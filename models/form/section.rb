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

class Form::Section < ActiveRecord::Base
	include Sortable

	belongs_to :form, class_name: 'Form::Form'

	has_many :subsections, dependent: :destroy, class_name: 'Form::Subsection'
	has_many :questions, through: :subsections, class_name: 'Form::Question'
	
	has_many :extras, dependent: :destroy, class_name: 'Form::Extra'
	has_many :proposal_extras, dependent: :destroy, class_name: 'Proposal::Extra'

	validates :form_id, presence: true

	validates :name, presence: true

	accepts_nested_attributes_for :subsections, allow_destroy: true, reject_if: :all_blank
	accepts_nested_attributes_for :extras, allow_destroy: true, reject_if: proc { |attributes| attributes['input'].blank? }

	TYPES = [
		'content',
		'navbar',
		'settings',
		'subnav'
	]

	def where_for_position
		self.form.sections
	end

end
