require "rails_helper"

RSpec.describe CreditBorrowsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/borrowers/1/credit_borrows").to route_to("credit_borrows#index", borrower_id: "1")
    end

    it "routes to #new" do
      expect(get: "/borrowers/1/credit_borrows/new").to route_to("credit_borrows#new", borrower_id: "1")
    end

    it "routes to #show" do
      expect(get: "/credit_borrows/1").to route_to("credit_borrows#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/credit_borrows/1/edit").to route_to("credit_borrows#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/borrowers/1/credit_borrows").to route_to("credit_borrows#create", borrower_id: "1")
    end

    it "routes to #update via PUT" do
      expect(put: "/credit_borrows/1").to route_to("credit_borrows#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/credit_borrows/1").to route_to("credit_borrows#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/credit_borrows/1").to route_to("credit_borrows#destroy", id: "1")
    end
  end
end
