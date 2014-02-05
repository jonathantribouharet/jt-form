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

class Form::Form < ActiveRecord::Base

	has_many :sections, dependent: :destroy, class_name: 'Form::Section'
	has_many :questions, through: :sections, class_name: 'Form::Question'

	has_many :proposals, dependent: :destroy, class_name: 'Proposal::Proposal'

	validates :name, presence: true

	accepts_nested_attributes_for :sections, allow_destroy: true, reject_if: proc { |attributes| attributes['name'].blank? && attributes['subsections_attributes'].blank? }

	def self.create_with_form(name, form_id)
		begin
			form = Form::Form.find(form_id)
			newForm = Form::Form.create! name: name
		rescue
			return false
		end

		for section in form.sections.all

			newSection = newForm.sections.create!(section.attributes.merge({'id' => nil}))

			for extra in section.extras.all
				newSection.extras.create!(extra.attributes.merge({'id' => nil}))
			end
			for subsection in section.subsections.all
				newSubsection = newSection.subsections.create!(subsection.attributes.merge({'id' => nil}))

				for question in subsection.questions.all
					newSubsection.questions.create!(question.attributes.merge({'id' => nil}))
				end
			end
		end

		newForm
	end

end
