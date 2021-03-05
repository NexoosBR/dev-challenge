module CreditService
  class Create
    attr_accessor :credit

    def initialize(params)
      @params = params
      @success = false
    end

    def execute
      @credit = Credit.new(@params)
      @success = @credit.save

      self
    end

    def success?
      @success
    end
  end
end
