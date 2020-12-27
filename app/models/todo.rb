class Todo < ApplicationRecord
	validates :title, presence: true, length: { maximum: 30 }
	validates :body, presence: true
	validates :deadline, length: { maximum: 10 }
	validates :progress, length: { maximum: 10 }
end
