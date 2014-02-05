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

class Proposal::AccessUrl < ActiveRecord::Base

	belongs_to :proposal, class_name: 'Proposal::Proposal'

	has_many :access_stats, dependent: :destroy, class_name: 'Proposal::AccessStat'
	has_many :contacts, dependent: :nullify, class_name: 'Proposal::Contact'

	validates :proposal_id, presence: true
	validates :name, presence: true

	before_create :generate_token

	def generate_token
		base = self.proposal.name.parameterize
		lastId = 0 # Le 0 correspond au plugin

		self.token = base
		while self.class.where(token: self.token).count > 0
			self.token = base + '-' + lastId.to_s
			lastId += 1
		end
		
		true
	end

end
