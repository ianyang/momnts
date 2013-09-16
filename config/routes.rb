Project::Application.routes.draw do
  devise_for :users
  devise_for :users do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end

  devise_for :users, :controllers => {:sessions => 'sessions'}

  root :to => "events#index"

  resources :events
  get '/search' => 'events#search'
  get '/findnew' => 'events#index'
  get '/createnew' => 'events#new'
  get '/display' => 'events#display'
  get '/all_events' => 'events#all_events'
  post '/accept' => 'events#accept'

end
