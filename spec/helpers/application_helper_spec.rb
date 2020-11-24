require "rails_helper"

describe ApplicationHelper do
  context 'When checking css class for a success flash key' do
    it 'does return css class correctly' do
      expect(helper.flash_class_for(:success)).to eq('alert alert-success')
    end
  end

  context 'When checking css class for an error flash key' do
    it 'does return css class correctly' do
      expect(helper.flash_class_for(:error)).to eq('alert alert-danger')
    end
  end

  context 'When checking css class for an notice flash key' do
    it 'does return css class correctly' do
      expect(helper.flash_class_for(:notice)).to eq('alert alert-primary')
    end
  end
end
