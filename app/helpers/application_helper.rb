module ApplicationHelper
  def flash_class_for(key)
    case key.to_sym
    when :success
      'alert alert-success'
    when :error
      'alert alert-danger'
    when :notice
      'alert alert-primary'
    end
  end
end
