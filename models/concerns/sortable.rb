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

module Sortable
	extend ActiveSupport::Concern

	included do
		before_create :set_position_on_create
		after_update :set_position_on_update

		default_scope { order('position ASC') }
	end

	# can be override
	def where_for_position
		self.class.scoped
	end

	def set_position_on_create
		self.position = self.where_for_position.count + 1
	end

	def set_position_on_update
		if position_changed?
			up = position - position_was > 0
			scope = self.where_for_position.where('id != ?', id)
			if up
				scope.where('position > ?', position_was).where('position <= ?', position).update_all('position = position - 1')
			else
				scope.where('position >= ?', position).where('position < ?', position_was).update_all('position = position + 1')
			end
		end
	end

end