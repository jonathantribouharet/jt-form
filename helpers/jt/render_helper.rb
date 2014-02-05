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

module Jt::RenderHelper

	def render_section(type)
		render "/jt/sections/#{type}"
	end

	def render_template_section(type)
		render "/jt/template_sections/#{type}"
	end

	def render_subsection(type)
		render "/jt/subsections/#{type}"
	end

	def render_extra(type)
		render "/jt/extras/#{type}"
	end

	def render_question(type)
		render "/jt/questions/#{type}"
	end

	def render_template_question(type)
		render "/jt/template_questions/#{type}"
	end

	def render_extra_config(type, options)
		render "/jt/extras/#{type}_config", options
	end

	def render_question_config(type, options)
		render "/jt/questions/layout_config", { type: type, options: options }
	end

end
