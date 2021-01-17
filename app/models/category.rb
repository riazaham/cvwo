class Category < ApplicationRecord
    belongs_to :user
    has_many :todos, dependent: :destroy

    validates :name, presence: true
end
