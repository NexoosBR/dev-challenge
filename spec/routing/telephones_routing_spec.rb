require "rails_helper"

RSpec.describe TelephonesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/telephones").to route_to("telephones#index")
    end

    it "routes to #new" do
      expect(get: "/telephones/new").to route_to("telephones#new")
    end

    it "routes to #show" do
      expect(get: "/telephones/1").to route_to("telephones#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/telephones/1/edit").to route_to("telephones#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/telephones").to route_to("telephones#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/telephones/1").to route_to("telephones#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/telephones/1").to route_to("telephones#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/telephones/1").to route_to("telephones#destroy", id: "1")
    end
  end
end
