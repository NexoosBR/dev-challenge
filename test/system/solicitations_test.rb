require "application_system_test_case"

class SolicitationsTest < ApplicationSystemTestCase
  setup do
    @solicitation = solicitations(:one)
  end

  test "visiting the index" do
    visit solicitations_url
    assert_selector "h1", text: "Solicitations"
  end

  test "creating a Solicitation" do
    visit solicitations_url
    click_on "New Solicitation"

    fill_in "Amount", with: @solicitation.amount
    fill_in "Company", with: @solicitation.company_id
    click_on "Create Solicitation"

    assert_text "Solicitation was successfully created"
    click_on "Back"
  end

  test "updating a Solicitation" do
    visit solicitations_url
    click_on "Edit", match: :first

    fill_in "Amount", with: @solicitation.amount
    fill_in "Company", with: @solicitation.company_id
    click_on "Update Solicitation"

    assert_text "Solicitation was successfully updated"
    click_on "Back"
  end

  test "destroying a Solicitation" do
    visit solicitations_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Solicitation was successfully destroyed"
  end
end
