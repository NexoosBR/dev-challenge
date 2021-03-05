module ClientService
  class Create
    attr_accessor :client

    def initialize(params)
      @params = params
      @success = false
    end

    def execute
      @client = Client.new(@params)
      @success = @client.save

      self
    end

    def success?
      @success
    end
  end
end
