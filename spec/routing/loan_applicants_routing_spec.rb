require "rails_helper"

RSpec.describe LoanApplicantsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/loan_applicants").to route_to("loan_applicants#index")
    end

    it "routes to #new" do
      expect(get: "/loan_applicants/new").to route_to("loan_applicants#new")
    end

    it "routes to #show" do
      expect(get: "/loan_applicants/1").to route_to("loan_applicants#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/loan_applicants/1/edit").to route_to("loan_applicants#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/loan_applicants").to route_to("loan_applicants#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/loan_applicants/1").to route_to("loan_applicants#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/loan_applicants/1").to route_to("loan_applicants#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/loan_applicants/1").to route_to("loan_applicants#destroy", id: "1")
    end
  end
end
