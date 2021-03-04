require "rails_helper"

RSpec.describe LoanApplicationsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/loan_applications").to route_to("loan_applications#index")
    end

    it "routes to #new" do
      expect(get: "/loan_applications/new").to route_to("loan_applications#new")
    end

    it "routes to #show" do
      expect(get: "/loan_applications/1").to route_to("loan_applications#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/loan_applications/1/edit").to route_to("loan_applications#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/loan_applications").to route_to("loan_applications#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/loan_applications/1").to route_to("loan_applications#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/loan_applications/1").to route_to("loan_applications#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/loan_applications/1").to route_to("loan_applications#destroy", id: "1")
    end
  end
end
