module ApplicationHelper
  def title(title_string)
    content_for :title do
      title_string
    end
  end

  def link_to_back(path)
    render 'shared/link_to_back', path: path
  end

  def link_to_new_resource(path, title = nil)
    render 'shared/link_to_new_resource', title: title, path: path
  end

  def link_to_edit_resource(path, title = nil)
    render 'shared/link_to_edit_resource', title: title, path: path
  end

  def link_to_detail_resource(path, title = nil)
    render 'shared/link_to_detail_resource', title: title, path: path
  end

  def boolean_label(boolean)
    boolean == true ? t(:yep) : t(:nope)
  end
end
