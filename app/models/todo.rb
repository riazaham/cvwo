class Todo < ApplicationRecord
    belongs_to :category
    
    validates :name, presence: true, length: { maximum: 30 }
	validates :body, length: { maximum: 200 }
end
