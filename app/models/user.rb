class User < ApplicationRecord
    has_many :categories

    has_secure_password
    
end
