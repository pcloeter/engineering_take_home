module Api
  module V1 
    class ClientsController < ActionController::API
      def index
        clients = Client.includes(:custom_fields).all
        render json: {
          status: "success",
          clients: clients.as_json(include: { custom_fields: { only: [:name, :field_type, :validations] }})
        }
      end
    end
  end
end