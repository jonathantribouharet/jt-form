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

class Proposal::Answer < ActiveRecord::Base

	include Serialize
	
	belongs_to :proposal, class_name: 'Porposal::Porposal'
	belongs_to :question, class_name: 'Form::Question'

	validates :proposal_id, :question_id, presence: true

	validates :key, presence: true

	serialize :data

end
