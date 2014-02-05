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

class Api::ProposalsController < ApplicationController

	after_action :set_access_control_headers

	def set_access_control_headers
		headers['Access-Control-Allow-Origin'] = '*'
		headers['Access-Control-Request-Method'] = '*'
	end

	def show
		access = Proposal::AccessUrl.find_by_token!(params[:id])
		proposal = access.proposal

		# prevoir quand deja venu
		if params[:preview].blank?
			access_stat_id ||= access.access_stats.create proposal: proposal, remote_ip: request.remote_ip, referer: request.referer, session_end: Time.now
			session[:access_stat_id] = access_stat_id.id
		end

		render json: {
			name: proposal.name,
			data: proposal.answers,
			templateData: proposal.template_answers
		}
	end

	def alive
		stat = Proposal::AccessStat.find(session[:access_stat_id])
		stat.update_column(:session_end, Time.now)
		render nothing: true
	end

	def contact
		access = Proposal::AccessUrl.find_by_token!(params[:id])
		contact = access.contacts.new(params[:contact].permit!)
		contact.proposal = access.proposal

		if contact.save
			render json: true
		else
			render json: false
		end
	end

end
