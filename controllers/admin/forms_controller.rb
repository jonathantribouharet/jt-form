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

class Admin::FormsController < Admin::AdminController

	before_action :find_form, :only => [:edit, :update, :destroy, :extra, :questions, :question]

	def index
		@forms = Form::Form.all
	end

	def create
		form = Form::Form.new(params[:form_form].permit(:name))
		
		if form.save
			redirect_to edit_admin_form_url(form)
		else
			redirect_to admin_forms_url
		end
	end

	def edit
		@form.sections.each {|s| s.subsections.new }
		@form.sections.each {|s| s.extras.new }
		
		@form.sections.new
	end

	def questions
		@form.sections.each {|s| s.subsections.each { |ss| ss.questions.new } }
	end

	# WARNING, bug quand submit avec questions, les autres sections sont vides
	def update
		if @form.update_attributes(params[:form_form].permit!)
			flash[:success] = 'Saved'

			redirect_to(params[:return_to].blank? ? edit_admin_form_url(@form) : questions_admin_form_url(@form))
		else
			flash[:alert] = @form.errors.map { |key, message| key.to_s + ': ' + message.to_s }.join("\n")

			render(params[:return_to].blank? ? :edit : :questions)
		end
	end

	def destroy
		@form.destroy
		redirect_to admin_forms_url
	end

	def duplicate
		form = Form::Form.create_with_form(params[:name], params[:form_id])
		if form
			redirect_to edit_admin_form_url(form)
		else
			flash[:alert] = 'Failed'
			redirect_to admin_forms_url
		end
	end

	def extra
		@form.sections.each {|s| s.extras.new }
		render layout: nil
	end

	def question
		@form.sections.each {|s| s.subsections.each { |ss| ss.questions.new } }
		render layout: nil
	end

private

	def find_form
		@form = Form::Form.includes(sections: [:extras, subsections: [:questions]]).find(params[:id])
	end

end
