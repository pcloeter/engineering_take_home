module Api
  module V1 
    class BuildingsController < ActionController::API
      def index
        buildings = Building.includes(:client).all
        render json: { status: "success", buildings: format_buildings_json(buildings) }
      end

      def create
        @building = Building.new(building_params)

        validate_custom_fields!

        if @building.errors.any?
          render json: { error: @building.errors.full_messages }, status: :unprocessable_entity
        elsif @building.save
          render status: 201 
        else
          render json: { error: @building.errors.full_messages }, status: :unprocessable_entity 
        end 
      end

      def update
      end
      
      private

      def validate_custom_fields!
        client = Client.find(@building.client_id)
        field_configs = client.custom_fields.index_by(&:name)

        @building.custom_fields.each do |k, v|
          config = field_configs[k]

          if config.nil?
            @building.errors.add(:custom_fields, "'#{k}' is not a valid custom field for this client.")
            next
          end

          if config.field_type == 'number' && !v.is_a?(Numeric)
            @building.errors.add(k.to_sym, "must be a number, but received '#{v}'.")
          end

          if config.field_type == 'enum' && !config.validations['enum_values'].include?(v)
            @building.errors.add(k.to_sym, "'#{v}' is not a valid option. Please choose from: #{config.validations['enum_values'].join(', ')}.")
          end
        end
      end


      def building_params
        params.require(:building).permit(
          :client_id,
          :address,
          :state,
          :zip
        ).merge(custom_fields: params[:building][:custom_fields] || {})
      end
      
      def format_buildings_json(buildings)
        buildings.map { |building| format_building(building)}
      end
      
      def format_building(building)
        {
          id: building.id,
          client_name: building.client.name,
          address: building.address,
          # was not in the sample output, but if it were desired:
          # state: building.state,
          # zip: building.zip
        }.merge(building.custom_fields)
      end
    end
  end
end