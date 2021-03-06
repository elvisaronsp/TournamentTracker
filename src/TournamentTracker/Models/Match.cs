﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TournamentTracker.Models.Enumerations;

namespace TournamentTracker.Models
{
    public class Match
    {
        public int Id { get; set; }
        public string PlayerOneId {get; set;}
        public string PlayerTwoId {get; set;}
        public int PlayerOneScore { get; set; }
        public int PlayerTwoScore { get; set; }
        public string MatchWinnerId{get; set;}
        public ApplicationUser PlayerOne { get; set; }
        public ApplicationUser PlayerTwo { get; set; }
        public MatchStatus? Status {get; set;}
        public DateTime? CompletionDate {get; set;}
    }
}
