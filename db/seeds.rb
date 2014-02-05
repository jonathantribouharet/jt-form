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

t = ::Template::Template.create! name: 'Corporate Business'
s = t.sections.create! name: 'General settings'

s.questions.create! key: 'logo', content: 'Logo', input: 'file_field', options: { min_template: 1, max_template: 1 }
s.questions.create! key: 'header', content: 'Header', input: 'file_field', options: { min_template: 1, max_template: 5 }
s.questions.create! key: 'video_url', content: 'Video', input: 'text_field', options: { min_template: 1, max_template: 1 }
s.questions.create! key: 'transition_images', content: 'Photo Transition', input: 'file_field', options: { min_template: 1, max_template: 2, is_image: true, format: { width: 1058, height: 383 } }
s.questions.create! key: 'transition_texts', content: 'Text Transition', input: 'text_field', options: { min_template: 3, max_template: 3 }

# transition 1058 x 383
# team  169 x 169
# text_area_file 396x297

# is_image: true, format: { width: 1058, height: 383 }
# is_image: true, format: { width: 169, height: 169 }
# is_image: true, format: { width: 396, height: 297 }


::Template::Question.where(key: 'transition_images').first.update(options: { min_template: 1, max_template: 2, is_image: true, format: { width: 1058, height: 383 }})
Proposal::Media.all.to_a.each {|m| m.set_media_image_size }
