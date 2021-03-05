require "rails_helper"

RSpec.describe InstallmentsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/installments").to route_to("installments#index")
    end

    it "routes to #new" do
      expect(get: "/installments/new").to route_to("installments#new")
    end

    it "routes to #show" do
      expect(get: "/installments/1").to route_to("installments#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/installments/1/edit").to route_to("installments#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/installments").to route_to("installments#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/installments/1").to route_to("installments#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/installments/1").to route_to("installments#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/installments/1").to route_to("installments#destroy", id: "1")
    end
  end
end
