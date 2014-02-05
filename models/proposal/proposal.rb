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

class Proposal::Proposal < ActiveRecord::Base

	include Serialize

	belongs_to :form, class_name: 'Form::Form'
	belongs_to :template, class_name: 'Template::Template'
	belongs_to :user

	has_many :medias, dependent: :destroy, class_name: 'Proposal::Media'
	has_many :answers, dependent: :destroy, class_name: 'Proposal::Answer'
	has_many :template_answers, dependent: :destroy, class_name: 'Template::Answer'
	has_many :extras, dependent: :destroy, class_name: 'Proposal::Extra'
	has_many :access_urls, dependent: :destroy, class_name: 'Proposal::AccessUrl'
	has_many :access_stats, dependent: :destroy, class_name: 'Proposal::AccessStat'
	has_many :contacts, dependent: :destroy, class_name: 'Proposal::Contact'
	
	validates :form_id, :template_id, :user_id, presence: true

	validates :name, :percent, presence: true	

	serialize :data

	attr_accessor :is_quick


	def is_published?
		self.published_at != nil
	end

	def generate_default_data
		self.answers.create! question_id: (self.form.questions.find_by_key('key_numbers').id), key: 'key_numbers', data: {"data"=>{"0"=>{"name"=>"", "value"=>""}, "1"=>{"name"=>"", "value"=>""}, "2"=>{"name"=>"", "value"=>""}, "3"=>{"name"=>"", "value"=>""}}}
		self.answers.create! question_id: (self.form.questions.find_by_key('attendee_gender').id), key: 'attendee_gender', data: {"data"=>{"0"=>{"value"=>"50"}}, "dataValid"=>{"0"=>{"value"=>"50"}}}
		self.answers.create! question_id: (self.form.questions.find_by_key('target_audience').id), key: 'target_audience', data: {"data"=>{"0"=>{"0"=>{"name"=>"Attendees' Profile", "values"=>{"0"=>{"name"=>"Webdesigners", "percent"=>"10"}, "1"=>{"name"=>"Webdeveloppers", "percent"=>"40"}, "2"=>{"name"=>"Business guys", "percent"=>"30"}, "3"=>{"name"=>"VCs", "percent"=>"10"}, "4"=>{"name"=>"Journalist", "percent"=>"5"}, "5"=>{"name"=>"Others", "percent"=>"5"}}}, "1"=>{"name"=>"Attendees' Age", "values"=>{"0"=>{"name"=>"18-25 Years old", "percent"=>"10"}, "1"=>{"name"=>"25-34 Years old", "percent"=>"30"}, "2"=>{"name"=>"35-44 Years old", "percent"=>"20"}, "3"=>{"name"=>"45-54 Years old", "percent"=>"10"}, "4"=>{"name"=>"55-64 Years old", "percent"=>"20"}, "5"=>{"name"=>"Over 65 Years old", "percent"=>"10"}}}}}, "dataValid"=>{"0"=>{"0"=>{"name"=>"Attendees' Profile", "values"=>{"0"=>{"name"=>"Webdesigners", "percent"=>"10"}, "1"=>{"name"=>"Webdeveloppers", "percent"=>"40"}, "2"=>{"name"=>"Business guys", "percent"=>"30"}, "3"=>{"name"=>"VCs", "percent"=>"10"}, "4"=>{"name"=>"Journalist", "percent"=>"5"}, "5"=>{"name"=>"Others", "percent"=>"5"}}}, "1"=>{"name"=>"Attendees' Age", "values"=>{"0"=>{"name"=>"18-25 Years old", "percent"=>"10"}, "1"=>{"name"=>"25-34 Years old", "percent"=>"30"}, "2"=>{"name"=>"35-44 Years old", "percent"=>"20"}, "3"=>{"name"=>"45-54 Years old", "percent"=>"10"}, "4"=>{"name"=>"55-64 Years old", "percent"=>"20"}, "5"=>{"name"=>"Over 65 Years old", "percent"=>"10"}}}}}}
		self.answers.create! question_id: (self.form.questions.find_by_key('my_media_social').id), key: 'my_media_social', data: {"data"=>{"0"=>{"network"=>"Google+", "url"=>"", "hashtag"=>"", "content"=>""}, "1"=>{"network"=>"", "url"=>"", "hashtag"=>"", "content"=>""}, "2"=>{"network"=>"", "url"=>"", "hashtag"=>"", "content"=>""}}}
		self.answers.create! question_id: (self.form.questions.find_by_key('my_media_website').id), key: 'my_media_website', data: {"data"=>{"0"=>{"name"=>"", "url"=>"", "content"=>""}, "1"=>{"name"=>"", "url"=>"", "content"=>""}, "2"=>{"name"=>"", "url"=>"", "content"=>""}}}
		self.answers.create! question_id: (self.form.questions.find_by_key('coverage_media_online').id), key: 'coverage_media_online', data: {"data"=>{"0"=>{"name"=>"", "url"=>"", "content"=>""}, "1"=>{"name"=>"", "url"=>"", "content"=>""}, "2"=>{"name"=>"", "url"=>"", "content"=>""}}}
		self.answers.create! question_id: (self.form.questions.find_by_key('finance').id), key: 'finance', data: {"data"=>{"0"=>{"income"=>{"0"=>{"name"=>""}, "1"=>{"name"=>""}, "2"=>{"name"=>""}}, "outcome"=>{"0"=>{"name"=>""}, "1"=>{"name"=>""}, "2"=>{"name"=>""}}}}}
		self.answers.create! question_id: (self.form.questions.find_by_key('packages').id), key: 'packages', data: {"data"=>{"0"=>{"packages"=>{"0"=>{"name"=>"Gold", "amount"=>"10000", "quantity"=>"1", "values"=>{"0"=>"Logo on the website", "1"=>"Special annoucement", "2"=>"Dedicated stand"}}, "1"=>{"name"=>"Silver", "amount"=>"5000", "quantity"=>"3", "values"=>{"0"=>"Logo on the website", "1"=>"Special annoucement"}}, "2"=>{"name"=>"Bronze", "amount"=>"1000", "quantity"=>"10", "values"=>{"0"=>"Logo on the website"}}}, "features"=>{"0"=>"Logo on the website", "1"=>"Special annoucement", "2"=>"Dedicated stand"}}}, "dataValid"=>{"0"=>{"packages"=>{"0"=>{"name"=>"Gold", "amount"=>"10000", "quantity"=>"1", "values"=>{"0"=>"Logo on the website", "1"=>"Special annoucement", "2"=>"Dedicated stand"}}, "1"=>{"name"=>"Silver", "amount"=>"5000", "quantity"=>"3", "values"=>{"0"=>"Logo on the website", "1"=>"Special annoucement"}}, "2"=>{"name"=>"Bronze", "amount"=>"1000", "quantity"=>"10", "values"=>{"0"=>"Logo on the website"}}}, "features"=>{"0"=>"Logo on the website", "1"=>"Special annoucement", "2"=>"Dedicated stand"}}}}
		self.answers.create! question_id: (self.form.questions.find_by_key('non_packages').id), key: 'non_packages', data: {"data"=>{"0"=>{"name"=>"", "amount"=>""}, "1"=>{"name"=>"", "amount"=>""}, "2"=>{"name"=>"", "amount"=>""}}}

		self.template_answers.create! question_id: (self.template.questions.find_by_key('transition_texts').id), key: 'transition_texts', data: {"data"=>{"0"=>{"value"=>"Sponsorship proposal"}, "1"=>{"value"=>"Add any text here"}, "2"=>{"value"=>"Edit this transition if you want"}}, "dataValid"=>{"0"=>{"value"=>"Sponsorship proposal"}, "1"=>{"value"=>"Add any text here"}, "2"=>{"value"=>"Edit this transition if you want"}}}

		self.access_urls.create! name: 'Default'
		self.access_urls.create! name: 'PLUGIN'
	end

end
