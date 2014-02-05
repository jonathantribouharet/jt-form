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

class Proposal::Media < ActiveRecord::Base

	include Serialize

	belongs_to :proposal, class_name: 'Proposal::Proposal'

	validates :proposal_id, presence: true

	has_attached_file :media, styles: { original: '2000x2000', thumb: '300x300' }, processors: lambda { |attachment| attachment.crop_w.nil? ? [:thumbnail] : [:cropper] }

	serialize :media_image_size

	after_create :set_media_image_size

	attr_accessor :crop_w, :crop_h, :crop_x, :crop_y

	def as_json(options)
		{
			id: self.id,
			name: self.media_file_name,
			url: self.media.url,
			size: self.media_image_size
		}
	end

	def set_media_image_size
		 begin
		 	self.media.save
		 	self.reload
		 	
			geo = Paperclip::Geometry.from_file(self.media.path)

			self.media_image_size = {
				width: geo.width.to_i, 
				height: geo.height.to_i
			}
			self.save
		rescue
		end
	end

	def crop(params)
		new_media = Proposal::Media.new
		new_media.proposal = self.proposal
		new_media.crop_x = params[:x]
		new_media.crop_y = params[:y]
		new_media.crop_w = params[:w]
		new_media.crop_h = params[:h]

		new_media.media = self.media

		new_media.save
		new_media
	end

end
