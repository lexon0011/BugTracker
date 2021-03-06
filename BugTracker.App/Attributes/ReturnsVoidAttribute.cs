﻿using System;
// ReSharper disable UnusedParameter.Local

namespace BugTracker.App.Attributes
{
    /// <summary>
    /// This attribute is used to annotate a controller method to return no value.
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class ReturnsVoidAttribute : Attribute
    {
    }
}