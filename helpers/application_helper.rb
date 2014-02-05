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

module ApplicationHelper

	def proposal_progress(progress)
		color = 'red'
		if progress == 100
			color = 'green'
		elsif progress >= 20 && progress < 100
			color = 'blue'
		end
		content_tag 'div' do
			content_tag 'span', nil, class: 'meter ' + color, width: "#{progress.to_i}%"
		end
	end

	def url_for_proposal_access_url(access_url)
		"http://#{request.host}#{ request.port != 80 ? ":#{request.port}" : ''}/p/#{access_url.token}"
	end

	def print_date(proposal)
		start_event = proposal.answers.where(key: 'date_place').first
		return "" if !start_event

		json = start_event.data

		return "" if json['data']['0'].blank? || json['data']['0']['start'].blank?

		start_event_text = json['data']['0']['start']
		start_event = Date.strptime(start_event_text, '%m/%d/%Y')
		return I18n.l(start_event, format: '%B %dth, %Y')
	end

end
