require "rails_helper"

RSpec.describe BorrowingsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/borrowers/1/borrowings").to route_to("borrowings#index", borrower_id: "1")
    end

    it "routes to #new" do
      expect(get: "/borrowers/1/borrowings/new").to route_to("borrowings#new", borrower_id: "1")
    end

    it "routes to #show" do
      expect(get: "/borrowings/1").to route_to("borrowings#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/borrowings/1/edit").to route_to("borrowings#edit", id: "1")
    end

    it "routes to #create" do
      expect(post: "/borrowers/1/borrowings").to route_to("borrowings#create", borrower_id: "1")
    end

    it "routes to #update via PUT" do
      expect(put: "/borrowings/1").to route_to("borrowings#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/borrowings/1").to route_to("borrowings#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/borrowings/1").to route_to("borrowings#destroy", id: "1")
    end
  end
end
