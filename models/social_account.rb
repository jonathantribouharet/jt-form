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

class SocialAccount < ActiveRecord::Base

	include Eventbrite
	include Meetup

	belongs_to :user

	validates :user_id, :provider_name, :provider_uid, presence: true

	def events
		self.send(self.provider_name + '_events')
	end

	def create_proposal(proposal, event_id)
		self.send(self.provider_name + '_create_proposal', proposal, event_id)
	end

end
