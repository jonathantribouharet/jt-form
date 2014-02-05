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

module Eventbrite

	def eventbrite_token
		client = OAuth2::Client.new(EVENTBRITE_API_CLIENT_ID, EVENTBRITE_API_KEY, site: 'https://www.eventbrite.com')
		OAuth2::AccessToken.new(client, self.token)
	end

	def eventbrite_events
		response = eventbrite_token.get('/json/user_list_events')
		json = JSON.parse(response.body)

		events = []
		for event in json['events']
			event = event['event']

			start_date = end_date = fulldate = nil

			logger.info event

			start_date = Date.strptime(event['start_date'], '%Y-%m-%d').strftime('%m/%d/%Y') if !event['start_date'].blank?
			end_date = Date.strptime(event['end_date'], '%Y-%m-%d').strftime('%m/%d/%Y') if !event['end_date'].blank?

			fulldate = start_date
			fulldate += ' - ' + end_date if end_date

			events << {
				id: event['id'],
				title: event['title'],
				image_url: event['logo_ssl'],
				status: event['status'],
				full_date: fulldate
			}
		end

		events
	end

	def eventbrite_create_proposal(proposal, eventbrite_event_id)
		response = eventbrite_token.get('/json/event_get?id=' + eventbrite_event_id.to_s)
		json = JSON.parse(response.body)
		json = json['event']

		proposal ||= self.user.proposals.new

		##############
		proposal.name ||= json['title']
		proposal.eventbrite_event_id = eventbrite_event_id.to_s
		##############

		proposal.save!
		proposal.generate_default_data

		##############

		proposal.answers.create(
			question_id: (Form::Question.find_by_key('event_description').id),
			key: 'event_description',
			data: {
				"data"=>{
					"0"=>{"value"=> ActionController::Base.helpers.strip_tags(json['description']) }
					},
				"dataValid"=>{
					"0"=>{"value"=> ActionController::Base.helpers.strip_tags(json['description']) }
					}
				}
			)

		start_date = end_date = nil

		start_date = Date.strptime(json['start_date'], '%Y-%m-%d').strftime('%m/%d/%Y') if !json['start_date'].blank?
		end_date = Date.strptime(json['end_date'], '%Y-%m-%d').strftime('%m/%d/%Y') if !json['end_date'].blank?

		json['venue'] ||= {}

		proposal.answers.create(
			question_id: (Form::Question.find_by_key('date_place').id),
			key: 'date_place',
			data: {
				"data"=>{
					"0"=>{
							"name"=> json['venue']['name'],
							"place"=> json['venue']['address'],
							"place_lat"=> json['venue']['latitude'],
							"place_lng"=> json['venue']['longitude'],
							"place_city"=> json['venue']['city'],
							"place_country"=> json['venue']['country'],
							"place_country_code"=> json['venue']['country_code'],
							"start" => start_date,
							"end" => end_date
						}
					},
				"dataValid"=>{
					"0"=>{
							"name"=> json['venue']['name'],
							"place"=> json['venue']['address'],
							"place_lat"=> json['venue']['latitude'],
							"place_lng"=> json['venue']['longitude'],
							"place_city"=> json['venue']['city'],
							"place_country"=> json['venue']['country'],
							"place_country_code"=> json['venue']['country_code'],
							"start" => start_date,
							"end" => end_date
						}
					}
				}
			)

		##############

		proposal
	end

end