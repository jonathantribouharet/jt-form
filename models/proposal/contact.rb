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

class Proposal::Contact < ActiveRecord::Base

	include Serialize

	belongs_to :proposal, class_name: 'Proposal::Proposal'
	belongs_to :access_url, class_name: 'Proposal::AccessUrl'
	belongs_to :access_stat, class_name: 'Proposal::AccessStats'

	validates :proposal_id, presence: true

	validates :name, :email, :content, presence: true

	serialize :packages
	serialize :non_packages

	after_create :send_email

	def send_email
		UserMailer.contact(self.proposal.user, self).deliver rescue nil
		true
	end

end
