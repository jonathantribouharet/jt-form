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

class Member::ProposalsController < Member::MemberController

	layout 'proposal'

	def index
		if current_user.proposals.all.to_a.size > 0 && current_user.firsttime_dashboard == true
			@firsttime = true 
			current_user.update_attribute(:firsttime_dashboard, false)
		end

		@forms = Form::Form.all
		@proposals = current_user.proposals.all.to_a.reverse
		@proposal = current_user.proposals.first

		for proposal in @proposals
			if proposal.access_urls.count == 0
				proposal.access_urls.create! name: 'Default'
				proposal.access_urls.create! name: 'PLUGIN'
			end
		end

		render layout: 'dashboard'
	end

	def create
		@proposal = current_user.proposals.new((params[:proposal_proposal] ? params[:proposal_proposal].permit! : nil))
		@proposal.form ||= Form::Form.first
		@proposal.template = ::Template::Template.first

		if @proposal.is_quick == "false"
			@proposal.data = {}
			for section in @proposal.form.sections.to_a
				@proposal.data[section.id.to_s] = {
					"isRemovable"=>"#{ section.is_removable ? "true" : "false" }",
					"isRemoved"=>"false",
					"isValided"=>""
				}
			end
		end

		if !params[:event_id].blank?
			@proposal = current_user.social_accounts.last.eventbrite_create_proposal(@proposal, params[:event_id])
			redirect_to edit_member_proposal_url(@proposal)
			return
		end

		if @proposal.save
			@proposal.generate_default_data
			redirect_to edit_member_proposal_url(@proposal)
		else
			redirect_to member_proposals_url
		end
	end

	def show
		@proposal = current_user.proposals.find(params[:id])
	end

	def edit
		@proposal = current_user.proposals.includes(form: [sections: [:extras, subsections: [:questions]]]).find(params[:id])
		@form = @proposal.form
		@template = @proposal.template


		if current_user.firsttime_new_proposal == true
			@firsttime = true
			current_user.update_attribute(:firsttime_new_proposal, false)
		end
	end

	def update
		proposal = current_user.proposals.find(params[:id])

		if params[:form_answers]
			for key, value in params[:form_answers]
				answer = proposal.answers.find_or_initialize_by(question_id: value[:question_id], key: key)
				answer.data = value[:data] || {}
				answer.save!
			end
		end

		if params[:template_answers]
			for key, value in params[:template_answers]
				answer = proposal.template_answers.find_or_initialize_by(question_id: value[:question_id], key: key)
				answer.data = value[:data] || {}
				answer.save!
			end
		end

		if params[:proposal_data]
			proposal.data = params[:proposal_data]
			proposal.save!
		end

		if params[:proposal]
			proposal.name = params[:proposal][:name]
			proposal.save!
		end

		if params[:proposal_proposal]
			proposal.update(params[:proposal_proposal].permit!)
		end

		render nothing: true
	end

	def destroy
		proposal = current_user.proposals.find(params[:id])
		proposal.destroy

		redirect_to member_proposals_url
	end

	def upload
		proposal = current_user.proposals.find(params[:id])
		media = proposal.medias.create(media: params[:file])

		render json: media
	end

	def crop
		response = current_user.proposals.find(params[:id])
		media = response.medias.find(params[:media_id])

		new_media = media.crop(params)

		render json: new_media
	end

	def add_access_url
		proposal = current_user.proposals.find(params[:id])
		@access_url = proposal.access_urls.create(params[:proposal_access_url].permit!)
	end

	def plugin
		@proposal = current_user.proposals.find(params[:id])
		render layout: nil
	end

	def publish
		proposal = current_user.proposals.find(params[:id])
		proposal.published_at = Time.now
		proposal.save
		
		redirect_to member_proposals_url
	end

end
