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

module Meetup

	def meetup_token
		client = OAuth2::Client.new(MEETUP_API_KEY, MEETUP_API_SECRET, site: 'https://api.meetup.com')
		OAuth2::AccessToken.new(client, self.token, expires_at: self.expires_at, refresh_token: self.refresh_token)
	end

	def meetup_events
		response = meetup_token.get('/2/concierge')
		json = JSON.parse(response.body)

		json['results']
	end

	def meetup_create_proposal(proposal, meetup_event_id)
		response = meetup_token.get('/2/event/' + meetup_event_id.to_s)
		json = JSON.parse(response.body)

		proposal ||= self.user.proposals.new

		##############
		proposal.name ||= json['name']
		proposal.meetup_event_id = meetup_event_id.to_s
		##############

		proposal.save!
		proposal.generate_default_data

		##############

		proposal.answers.create!(
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

		start_date = nil

		start_date = Date.strptime((json['time'] / 1000).to_s, '%s').strftime('%m/%d/%Y') if !json['time'].blank?

		proposal.answers.create!(
			question_id: (Form::Question.find_by_key('date_place').id),
			key: 'date_place',
			data: {
				"data"=>{
					"0"=>{
							"name"=> json['venue']['name'],
							"place"=> json['venue']['address_1'],
							"place_lat"=> json['venue']['lat'],
							"place_lng"=> json['venue']['lon'],
							"place_city"=> json['venue']['city'],
							"place_country"=> json['venue']['country'],
							"start" => start_date
						}
					},
				"dataValid"=>{
					"0"=>{
							"name"=> json['venue']['name'],
							"place"=> json['venue']['address_1'],
							"place_lat"=> json['venue']['lat'],
							"place_lng"=> json['venue']['lon'],
							"place_city"=> json['venue']['city'],
							"place_country"=> json['venue']['country'],
							"start" => start_date
						}
					}
				}
			)

		##############

		proposal
	end

end